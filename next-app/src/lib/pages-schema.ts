import { z } from "zod";

const pageSectionSchema = z.object({
  heading: z.string().optional(),
  level: z.number().optional(),
  content: z.string().optional(),
  list: z.array(z.string()).optional(),
});

const serviceAreaLocationSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export const pageRecordSchema = z
  .object({
    url: z.string(),
    type: z.enum(["service", "resource", "page", "guide"]).optional(),
    title: z.string(),
    seo: z.object({
      keywords: z.array(z.string()),
      meta_description: z.string(),
    }),
    pagecontent: z.string(),
    sections: z.array(pageSectionSchema).optional(),
    service_area_locations: z.array(serviceAreaLocationSchema).optional(),
  })
  .passthrough();

export const pagesJsonSchema = z.array(pageRecordSchema);

export type PageRecord = z.infer<typeof pageRecordSchema>;
