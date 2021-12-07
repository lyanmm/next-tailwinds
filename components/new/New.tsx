import styles from './new.module.css'
import { Article } from "../../utils/types";
import Link from "next/link";


export default function News(props: Article) {
  const maxLength = 80;
  let description = props.description;
  if (description.length > maxLength) {
    description = description.slice(0, maxLength) + '...';
  }
  return (
    <Link href={'/news/detail' + process.env.NEXT_PUBLIC_SUFFIX_HTML + '?id=' + props.id}>
      <div
        className={'group w-300 flex ml-90 pl-4 pr-8 hover:shadow-xl hover:bg-white rounded-lg trans-motion cursor-pointer mt-4'}>
        <div className={'relative mr-6 my-4'} style={{ width: '20rem', height: '11.25rem' }}>
          <img draggable={false} alt={'news-cover'} src={props.cover}  className={styles.img} />
        </div>
        <div className={'w-full flex justify-center flex-col'}>
          <div className={'group-hover:text-bang text-cblack text-28px select-none w-4/5 truncate'}>{props.title}</div>
          <div className={'flex justify-between ' + styles['news-summary']}>
            <span className={'w-4/5'}>{description}</span>
            <span>{props.publicAt}</span>
          </div>
        </div>

      </div>
    </Link>
  )
}
