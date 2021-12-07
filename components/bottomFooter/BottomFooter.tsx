import {CommonSettings} from "../../utils/types";
import cn from "classnames";
import Link from "next/link";
import {linksData} from "../../utils/config";


export default function BottomFooter({hotline, icp, mp_qr_code, working_time, address}: CommonSettings) {
  const title = 'text-xl text-cblack';
  return (
    <footer className={'hidden md:flex flex-col justify-between bg-white w-full h-100 items-center'}>
      <div className={'w-300 flex justify-between mt-20'}>
        {linksData.map((value, index) =>
          <div key={index} className={cn(title, 'space-y-4')}>
            <div className={'pb-2'}>{value.title}</div>
            {value.list.map((item, idx) =>
              <Link href={value.url + item.url} key={item.url}>
                <div className={'w-max text-bottom-link text-sm mt-4 cursor-pointer hover:text-bang'}>
                  {item.text}
                </div>
              </Link>
            )}
          </div>)}
        <div>
          <p className={cn(title)}>联系我们</p>
          {/*{hotline &&*/}
          {/*<p title={hotline.value} className={'text-28px text-cblack mt-7 w-70 truncate'}>{hotline.value}</p>}*/}
          <p style={{color: '#6D7488'}} className={'mt-6 text-sm'}>地址：{address?.value}</p>
          {working_time && <p style={{color: '#6D7488'}} className={'mt-4 text-sm'}>工作时间：{working_time.value}</p>}
        </div>
        <div className={'flex-center'}>
          <h3 className={cn(title)}>邦乎小程序</h3>
          <div style={{border: '1px solid #DADDE6', width: '6.5rem', height: '6.5rem'}}
               className={'flex items-center justify-center rounded-lg overflow-hidden mt-4'}>
            {/*<Image draggable={false} src={mp_qr_code.value} width={120} height={120} alt={'qr'}/>*/}
            {mp_qr_code && <img draggable={false} src={mp_qr_code.value} className={'object-cover'}
                                style={{width: '5.625rem', height: '5.625rem'}} alt={'qr'}/>}
          </div>
        </div>
      </div>
      <div style={{height: 1, width: '100%', backgroundColor: '#eee', marginTop: '5.625rem'}}/>
      {icp && <p style={{color: '#BCC2D5'}} className={'mb-5'}>{icp.value}</p>}
    </footer>
  )
}
