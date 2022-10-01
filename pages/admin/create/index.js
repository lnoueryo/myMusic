/** @jsxImportSource @emotion/react */

import styles from '/styles/Home.module.css'
import { Avatar, Box, Badge, Text, Textarea, Button, useToast } from '@chakra-ui/react'
import axios from '/modules/httpclient';
import AlertDialog from '../../components/AlertDialog';
import SelectTag from '../../components/SelectTag';
import CropperModal from '../../components/CropperModal';
import EditMarkdown from '../../components/EditMarkdown';
import Icon from '@mdi/react'
import { mdiCloseCircleOutline  } from '@mdi/js';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';


export default function CreateArticle(props) {
  const router = useRouter()
  const toast = useToast();

  const create = async(params) => {
    const srcParams = {src: '', newSrc: params['newSrc'], isDelete: false}
    const res = await saveImage(srcParams);
    params['src'] = res.data.src;
    let response;
    try {
      response = await axios.post('/api/blog', params);
    } catch (error) {
      console.log(error)
    }
    router.push('/admin');
    return !!response
  }

  const saveImage = async params => {
    const response = await axios.post('/api/storage', params);
    return response;
  }

  return (
    <div className="container">
      {<EditMarkdown func={create} props={[Object.values(props)]}/>}
    </div>
  )
}

CreateArticle.getInitialProps = async ({query}) => {
  const tags = await axios.get('/api/tag');
  return tags.data;
}
