import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./documents/author";
import { categoryType } from "./documents/category";
import { careersPageType } from "./documents/careers-page";
import { companyType } from "./documents/company";
import { homePageType } from "./documents/home-page";
import { industryType } from "./documents/industry";
import { jobType } from "./documents/job";
import { postType } from "./documents/post";
import { projectType } from "./documents/project";
import { serviceType } from "./documents/service";
import { siteSettingsType } from "./documents/site-settings";
import { ctaType } from "./objects/cta";
import { mediaImageType } from "./objects/media-image";
import { portableTextType } from "./objects/portable-text";
import { seoImageType } from "./objects/seo-image";
import { seoType } from "./objects/seo";

export const schemaTypes: SchemaTypeDefinition[] = [
  seoImageType,
  mediaImageType,
  ctaType,
  seoType,
  portableTextType,
  siteSettingsType,
  homePageType,
  careersPageType,
  serviceType,
  companyType,
  industryType,
  projectType,
  postType,
  authorType,
  categoryType,
  jobType,
];
