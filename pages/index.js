import styles from '../styles/Home.module.css'
import CategoryCards from './components/CategoryCards'
import axios from '/modules/httpclient'
import { css } from '@emotion/react'

export default function Home(categories) {

  return (
    <section>
      <div className="wrapper">
            {
              categories && Object.values(categories).map(category => {
                return (
                  <>
                    <h3 className='font24 bold'>{category.name}</h3>
                    <div className="container">
                      <div className="flex justify-center wrap content-container" css={contentContainer}>
                        <CategoryCards key={category.id} {...category} />
                      </div>
                    </div>
                  </>
                )
              })
            }
      </div>
    </section>
  )
};

Home.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/category')
  return response.data;
};

const contentContainer = css({
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'
});