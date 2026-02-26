import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name for the category (cloud, ai, leadership)',
      options: {
        list: [
          {title: 'Cloud', value: 'cloud'},
          {title: 'AI', value: 'ai'},
          {title: 'Leadership', value: 'leadership'},
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Tailwind color class for the category badge',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Purple', value: 'purple'},
          {title: 'Green', value: 'green'},
          {title: 'Orange', value: 'orange'},
        ],
      },
    }),
  ],
})
