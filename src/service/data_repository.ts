import { database } from './firebase';
import { query, ref, set, orderByChild, onValue, equalTo } from 'firebase/database';

export interface IContent {
  id: number;
  title?: string;
  date: string;
  color: string;
  place_name?: string;
  place_address?: string;
  text: string;
  year_month?: number;
}

export function uploadContent ( userId:string, content:IContent) {
  const db = database;
  set(ref(db, userId + '/DailyContents/' + content.id), {
    id: content.id,
    title: content.title,
    date: content.date,
    color: content.color,
    place_name: content.place_name,
    place_address: content.place_address,
    text: content.text,
    year_month: content.year_month,
  });
}

export function downloadContent (userId:string, setContent:any, year_month:number) {
  const db = database;
  const getDataRef = query(ref(db, userId + '/DailyContents/'), orderByChild('year_month'), equalTo(year_month))
  onValue(getDataRef, (snapshot)=>{
    setContent(snapshot.val())
  })
}