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
  if(req.query?.id) return show(req, res);

  let response;
  try {
    response = await db.query(`
      SELECT * FROM blogs;
    `)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const create = async(req, res) => {
  try {
    let response;
    const content = req.body.content.replace(/"/g, '\"\"').replace(/'/g, '\'\'')
    const blogQuery =
    `
    INSERT INTO blogs (title, description, content)
    VALUES ("${req.body.title}", "${req.body.description}", "${content}");
    `
    let tagQuery = 'INSERT INTO blogs_tags (blog_id, tag_id) VALUES'
    req.body.tags.forEach((tag, index) => {
      tagQuery += ` (LAST_INSERT_ID(), ${tag.id})`
      if(req.body.tags.length - 1 == index) return tagQuery += ` ;`
      tagQuery += ','
    });
    response = await db.transaction([blogQuery, tagQuery])
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
      SELECT bl.*,
      concat('[', IF(tg.id IS NULL, '', group_concat(JSON_OBJECT('id', tg.id, 'name', tg.name, 'src', tg.src, 'category', JSON_OBJECT('id', ct.id, 'name', ct.name)) order by tg.id separator ',')), ']') as tags
      FROM blogs bl
      LEFT JOIN blogs_tags bt ON bt.blog_id = bl.id
      LEFT JOIN tags tg ON bt.tag_id = tg.id
      LEFT JOIN categories ct ON tg.category_id = ct.id
      WHERE bl.id = ${req.query.id}
      GROUP BY bl.id, bl.title, bl.description, bl.content;
    `)
    const blog = response.map(blog => {
      blog.tags = JSON.parse(blog.tags);
      return blog;
    })
    res.status(200).json(blog)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const update = async(req, res) => {
  let response;
  const content = req.body.content.replace(/"/g, '\"\"').replace(/'/g, '\'\'')
  let deleteTagQuery = `DELETE FROM blogs_tags WHERE blog_id = ${req.body.id}`
  let tagQuery = 'INSERT INTO blogs_tags (blog_id, tag_id) VALUES'
  req.body.tags.forEach((tag, index) => {
    tagQuery += ` (${req.body.id}, ${tag.id})`
    if(req.body.tags.length - 1 == index) return tagQuery += ` ON DUPLICATE KEY UPDATE blog_id = ${req.body.id};`
    tagQuery += ','
  });
  let blogQuery =
  `
  UPDATE blogs SET title = "${req.body.title}", description = "${req.body.description}", content = "${content}" WHERE id = ${req.body.id};
  `
  try {
    response = await db.transaction([deleteTagQuery, blogQuery, tagQuery])
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export default handler