/** @jsxImportSource @emotion/react */

import { List, Avatar, ListItemAvatar, ListItemText, Typography, CardContent, Chip, Stack } from '@mui/material'
import { Fragment } from 'react'

export default function ProfileCard({maxWidth}) {
  return (
    <List sx={{ width: '100%', maxWidth: maxWidth, bgcolor: 'background.paper' }}>
      <CardContent style={{paddingTop: '0', paddingBottom: '0'}}>
        <div className='flex-align-center'>
          <ListItemAvatar>
            <Avatar alt="my photo" src="/inoueryo.png" />
          </ListItemAvatar>
          <div>
            <div className="title font20">lnoueryo</div>
            <div className="title font20">Web Developer</div>
          </div>
        </div>
        <p className="font14 word-break fc1">I&apos;m a Python and Javascript web developer and aiming to be a full-stack developer</p>
        <Stack direction="row" spacing={1} className="mb10">
          <Chip className="bold" label="Javascript" variant="outlined" avatar={<Avatar alt="Natacha" src={process.env.CATEGORY_URL + 'language/javascript.png'} />} />
          <Chip className="bold" label="Vue" variant="outlined" avatar={<Avatar alt="Natacha" src={process.env.CATEGORY_URL + 'framework/vue.png'} />} />
        </Stack>
        <Stack direction="row" spacing={1} className="mb10">
          <Chip className="bold" label="Python" variant="outlined" avatar={<Avatar alt="Natacha" src={process.env.CATEGORY_URL + 'language/python.png'} />} />
          <Chip className="bold" label="Django" variant="outlined" avatar={<Avatar alt="Natacha" src={process.env.CATEGORY_URL + 'framework/django.png'} />} />
        </Stack>
        <a className="font10" css={profile} href="https://lnoueryo.jounetsism.biz" target="blank">プロフィール →</a>
      </CardContent>
    </List>
  )
}

const profile = {
  display: 'block',
  textAlign: 'end',
  padding: '5px'
}