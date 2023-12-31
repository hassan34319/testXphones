import { BiCategory } from "react-icons/bi";

export default {
  name: "brandReal",
  title: "Brand Real",
  type: "document",
  icon: BiCategory,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "categoriesReal",
      title: "Categories",
      type: "array",
      of: [{ type: "categoryReal" }],
    },
    {
      name: "subcategories",
      title: "Sub Categories",
      type: "array",
      of: [{ type: "subcategory" }],
    },
  ]}