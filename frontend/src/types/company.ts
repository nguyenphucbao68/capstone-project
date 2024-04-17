export type Company = {
  brief_overview: string;
  company_facebook: string;
  company_name: string;
  company_size: string;
  company_type: string;
  company_website: string;
  country: string;
  id: string;
  ot_policy: string;
  overview: string;
  working_day: string;
  representative: string;
  representative_position: string;
  email: string;
  phone: string;
  company_location: CompanyLocate[];
  company_benefit: CompanyBenefit[];
  company_key_skill: CompanyKeySkill[];
  enable: boolean;
  slug: string;
  logo: string;
};
export type CompanyLocate = {
  id: string;
  company_id: string;
  address: string;
  long: number;
  lat: number;
};
export type CompanyKeySkill = {
  key_skills: string;
  description: string;
  company_id: string;
};
export type CompanyBenefit = {
  key_benefit: string;
  detail_description: string;
  company_images: string;
  company_id: string;
};
export type UpdateCompanyInput = {
  brief_overview: string;
  company_facebook: string;
  company_name: string;
  company_size: string;
  company_type: string;
  company_website: string;
  country: string;
  id: string;
  ot_policy: string;
  overview: string;
  working_day: string;
  company_location: CompanyLocate;
};
