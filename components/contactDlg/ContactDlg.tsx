import { useState } from 'react'
import styles from './ContactDlg.module.css'


export default function ContactDlg(props) {

  const [isShowDlg, setIsShowDlg] = useState(true)


  const closeContractUs = () => {
    setIsShowDlg(false)
  }

  return (
    isShowDlg ?
 
      (<div className={styles.mask} >
        <div className={styles.dialog}>

          <span>仅需1步，即刻预约体验</span>

          <a className={styles['close-btn']} onClick={closeContractUs}>x</a>

          <div>您的称呼：<input type="text" /></div>
          <div>您的手机号码：<input type="text" /></div>
          <div>企业名称：<input type="text" /></div>
          <div>选择企业规模：
            <select name="" id="">
              <option value=""></option>
              <option value=""></option>
            </select>
          </div>
        </div>
      </div>
      ) : null
  )
}
