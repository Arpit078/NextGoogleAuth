import React from 'react'
import styles from "./page.module.css"
import Login from '@/components/login'

function Home() {
  return (
    <main className={styles.wrapper}>
          <div className={styles.title}>
            <p>Burner Browsers</p>
          </div>
    
          <div className={styles.sub_text}>
            Docker browsers in the cloud for you to feel safe in the shady jungle of

          </div>
          <Login/>
          
        </main>
  )
}

export default Home