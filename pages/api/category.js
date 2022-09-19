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
    console.log(error)
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
      SELECT * FROM categories where id=${req.query.id};
    `)
    res.status(200).json(response)
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