// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Show } from '@chakra-ui/react'

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }
const db = require('../../modules/database')
const handler = async(req, res) => {
  if (req.method.toLocaleLowerCase() == 'get') {
    index(req, res)
  }

  if (req.method.toLocaleLowerCase() == 'post') {
    create(req, res);
  }

  if (req.method.toLocaleLowerCase() == 'put') {
    update(req, res)
  }
}

const index = async(req, res) => {
  if(req.query?.name) return show(req, res);

  let response;
  try {
    // response = await db.query(`
    // SELECT * FROM categories
    // `)

    response = await db.query(`
    SELECT ct.*
    , concat('[', group_concat(JSON_OBJECT('id', tg.id, 'name', tg.name, 'src', tg.src) order by tg.id separator ','), ']') as tags
      FROM categories ct
      LEFT JOIN tags tg
        ON tg.category_id = ct.id
      GROUP BY ct.id, ct.name;
    `)
    const categories = response.map(category => {
      category.tags = JSON.parse(category.tags);
      return category;
    })
    res.status(200).json(categories)
  } catch (error) {
    console.log(error.response)
    res.status(400).json(error)
  }
}

const create = async(req, res) => {
  try {
    let response;
    const content = req.body.content.replace(/"/g, '\"\"').replace(/'/g, '\'\'')
    const query =
    `
    INSERT INTO categories (title, description, content)
    VALUES ("${req.body.title}", "${req.body.description}", "${content}");
    `
    response = await db.query(query)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const show = async(req, res) => {
  let response;
  try {
    response = await db.query(`
      SELECT ct.*,
      concat('[', IF(bl.id IS NULL, '', group_concat(JSON_OBJECT('id', bl.id, 'title', bl.title, 'description', bl.description, 'src', bl.src, 'created_at', bl.created_at, 'tags', JSON_ARRAY(JSON_OBJECT('id', tg2.id, 'name', tg2.name, 'src', tg2.src, 'category', JSON_OBJECT('id', ct2.id, 'name', ct2.name)))) order by bl.id separator ',')), ']') as blogs
      FROM categories ct
      LEFT JOIN tags tg ON tg.category_id = ct.id
      LEFT JOIN blogs_tags bt ON bt.tag_id = tg.id
      LEFT JOIN blogs bl ON bl.id = bt.blog_id
      LEFT JOIN blogs_tags bt2 ON bl.id = bt2.blog_id
      LEFT JOIN tags tg2 ON bt2.tag_id = tg2.id
      LEFT JOIN categories ct2 ON tg2.category_id = ct2.id
      WHERE ct.name = "${req.query.name}"
      GROUP BY ct.id, ct.name;
    `)
    console.log(response)
    const category = response.map(category => {
      const blogObj = {}
      JSON.parse(category.blogs).forEach(blog => {
        if(blog.id in blogObj) {
          if(!blogObj[blog.id].tags.some(tag => tag.id == blog.tags[0].id)) {
            blogObj[blog.id].tags.unshift(blog.tags[0]);
          }
          return;
        }
        blogObj[blog.id] = blog;
      })
      // console.log(blogObj)
      category.blogs = Object.values(blogObj).sort((a, b) => {
        return b.id - a.id;
      });
      return category;
    })
    res.status(200).json(category)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const update = async(req, res) => {
  let response;
  const content = req.body.content.replace(/"/g, '\"\"').replace(/'/g, '\'\'')
  const query =
  `
  UPDATE categories
  SET title = "${req.body.title}", description = "${req.body.description}", content = "${content}"
  WHERE id = "${req.body.id}";
  `
  try {
    response = await db.query(query)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export default handler