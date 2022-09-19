import { mdiConsoleLine } from '@mdi/js';

const db = require('../../modules/database')
const handler = async(req, res) => {
  if (req.method.toLocaleLowerCase() == 'get') {
    index(req, res)
  }
}

const index = async(req, res) => {
  if(req.query?.id) return show(req, res);

  let response;
  try {
    response = await db.query(`
      SELECT tg.*, concat(group_concat(JSON_OBJECT('id', ct.id, 'name', ct.name))) as category
      FROM tags tg
      LEFT JOIN categories ct ON ct.id = tg.category_id
      GROUP BY tg.id, tg.name, tg.src;
    `)
    const tags = response.map(tag => {
      tag.category = JSON.parse(tag.category);
      return tag;
    })
    res.status(200).json(tags)
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
    INSERT INTO tags (title, description, content)
    VALUES ("${req.body.title}", "${req.body.description}", "${content}");
    `
    response = await db.query(query)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}
// SELECT tg.*,
// concat('[', IF(bl.id IS NULL, '', group_concat(JSON_OBJECT('id', bl.id, 'title', bl.title, 'description', bl.description, 'content', bl.content) order by bl.id separator ',')), ']') as blogs,
// JSON_OBJECT('id', ct.id, 'name', ct.name) as category
// FROM tags tg
// LEFT JOIN blogs_tags bt ON bt.tag_id = tg.id
// LEFT JOIN blogs bl ON bt.blog_id = bl.id
// LEFT JOIN categories ct ON tg.category_id = ct.id
// WHERE tg.id = ${req.query.id}
// GROUP BY tg.id, tg.name, tg.src;
const show = async(req, res) => {
  let response;
  try {
    response = await db.query(`
      SELECT tg.*,
      concat('[', IF(bl.id IS NULL, '', group_concat(JSON_OBJECT('id', bl.id, 'title', bl.title, 'description', bl.description) order by bl.id separator ',')), ']') as blogs,
      JSON_OBJECT('id', ct.id, 'name', ct.name) as category
      FROM tags tg
      LEFT JOIN blogs_tags bt ON bt.tag_id = tg.id
      LEFT JOIN blogs bl ON bt.blog_id = bl.id
      LEFT JOIN categories ct ON tg.category_id = ct.id
      WHERE tg.id = ${req.query.id}
      GROUP BY tg.id, tg.name, tg.src;
    `)
    const tag = response.map(tag => {
      tag.blogs = JSON.parse(tag.blogs);
      tag.category = JSON.parse(tag.category);
      return tag;
    })
    res.status(200).json(tag)
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
  UPDATE tags
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