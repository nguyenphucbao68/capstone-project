import { job } from "@prisma/client";
import dotenv from "dotenv";
import Logger from "../../utils/logger";
import { ContextInterface } from "../context";
import { SearchJobRequestDto } from "./dtos/SearchJobRequestDto";
import { JobSearchKeyCache, SEARCH_DOMAIN } from "../../constants/constant";
import crypto from 'crypto';
dotenv.config();

const Query = {
  //Show list of job
  searchJob: async (
    _: any,
    { query, skip = 0, take = 10, ...filter }: SearchJobRequestDto,
    { prisma, elastic, authUser, redis }: ContextInterface,
  ): Promise<{ total: number; jobs: job[] }> => {
    const logger = new Logger();
    logger.info(`searching for jobs with query: ${query}`);
    try {
      let jobs = [],
        total = 0,
        searchQuery = {};
      if (query) {
        searchQuery = {
          multi_match: {
            query,
            fields: ["name", "skills"]
          }
        };
      } else {
        searchQuery = {
          match_all: {}
        };
      }


      let where: Record<string, any> = {};

      if (filter.unit !== undefined) {
        where = {
          unit: filter.unit,
        };
      }
      if (filter.salaryTo !== undefined) {
        where = {
          ...where,
          salary_to: { lte: filter.salaryTo },
        };
      }
      if (filter.salaryFrom !== undefined) {
        where = {
          ...where,
          salary_from: { gte: filter.salaryFrom },
        };
      }
      if (filter.workingType?.length) {
        where = {
          ...where,
          working_type: {
            in: filter.workingType,
          },
        };
      }
      if (filter?.address && filter.address !== "all") {
        where = {
          ...where,
          job_working_location: {
            some: {
              company_location: {
                address: {
                  contains: filter.address,
                },
              },
            },
          },
        };
      }
      if (filter.companyType?.length) {
        where = {
          ...where,
          company: {
            company_type: {
              in: filter.companyType,
            },
          },
        };
      }
      let domain = SEARCH_DOMAIN.Public;
      if (authUser) {
        domain = SEARCH_DOMAIN.Authorized;
      }
      const hasKeyFromSearchQuery = crypto.createHash('md5').update(query).digest('hex');
      const sessionKey = JobSearchKeyCache(hasKeyFromSearchQuery, domain);

      const cachedResult = await new Promise<{ total: number; jobs: job[] }>((resolve, reject) => {
        redis.get(sessionKey, async (err, data) => {
          if (err) {
            logger.error("error getting data from redis", err);
            reject(err);
            return;
          }
          if (data) {
            const parseData = JSON.parse(data);
            const total = parseData.total || 0;
            const job_ids = parseData.jobs.map((job: any) => job.id);
            jobs = await prisma.job.findMany({
              where: {
                id: { in: job_ids },
                ...where,
              },
              include: {
                job_working_location: {
                  include: {
                    company_location: true,
                  },
                },
                company: true,
              },
            });
            resolve({
              total,
              jobs,
            });
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resolve(null);
          }
        });
      });
      if (cachedResult) {
        logger.info("Returned cached search result");
        return cachedResult; // Trả về kết quả cache nếu có
      }
      // Not search
      const result = await elastic.search({
        index: "job",
        body: {
          query: searchQuery,
          from: skip,
          size: take,
        },
      });
      total = ((result as any).hits.total.value as number) || 0;
      jobs = result.hits.hits.map((hit: any) => hit._source);
      redis.set(sessionKey, JSON.stringify({ total, jobs }), "EX", 300, (err) => {
        if (err) {
          logger.error("error setting data to redis", err);
        }
      });
      const job_ids = result.hits.hits.map((hit: any) => hit._source.id);
      jobs = await prisma.job.findMany({
        where: {
          id: { in: job_ids },
          ...where,
        },
        include: {
          job_working_location: {
            include: {
              company_location: true,
            },
          },
          company: true,
        },
      });

      if (authUser) {
        // check applied jobs
        const appliedJobs = await prisma.job_apply.findMany({
          where: {
            user_id: authUser.sub,
            job_id: {
              in: jobs.map((job) => job.id),
            },
          },
        });

        const savedJobs = await prisma.job_saved.findMany({
          where: {
            user_id: authUser.sub,
            job_id: {
              in: jobs.map((job) => job.id),
            },
          },
        });

        jobs = jobs.map((job) => {
          const applied = appliedJobs.find(
            (applied) => applied.job_id === job.id,
          );
          const saved = savedJobs.find((saved) => saved.job_id === job.id);
          return {
            ...job,
            is_hot: appliedJobs.length >= 10,
            was_applied: !!applied,
            saved: !!saved,
            applied,
          };
        });
      }
      logger.info("Returned search result");
      return {
        total,
        jobs,
      };
    } catch (error) {
      logger.error("error searching for jobs", error);
      return {
        total: 0,
        jobs: [],
      };
    }
  },
};

export default { Query };
