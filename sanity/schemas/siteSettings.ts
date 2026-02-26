import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Used for SEO and social sharing',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      description: 'The main mission statement displayed on the home page',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Image',
      type: 'image',
      description: 'Default image used when sharing on social media',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'twitter', title: 'Twitter', type: 'url'},
        {name: 'github', title: 'GitHub', type: 'url'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
