import { database } from './firebase';
import { query, ref, set, orderByChild, onValue, equalTo, remove, update } from 'firebase/database';

export interface IContent {
  id: number;
  title?: string;
  date: string;
  color: string;
  place_name?: string;
  place_address?: string;
  text: string;
  year_month?: number;
  x: number;
  y: number;
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
    x: content.x,
    y: content.y
  });
}

export function updateContent (userId:string, content:IContent) {
  const db = database;
  update(ref(db, userId + '/DailyContents/' + content.id), {
    title: content.title,
    date: content.date,
    color: content.color,
    place_name: content.place_name,
    place_address: content.place_address,
    text: content.text,
    year_month: content.year_month,
    x: content.x,
    y: content.y
  });
}

export function requestContent (userId:string, setContent:any, year_month:number) {
  const db = database;
  const getDataRef = query(ref(db, userId + '/DailyContents/'), orderByChild('year_month'), equalTo(year_month))
  onValue(getDataRef, (snapshot)=>{
    setContent(snapshot.val())
  })
}

export function downloadContentMap (userId:string, setContent:any) {
  const db = database;
  const getDataRef = query(ref(db, userId + '/DailyContents/'), orderByChild('year_month'))
  onValue(getDataRef, (snapshot)=>{
    setContent(snapshot.val())
  })
}

export function deleteContent (userId: string, content:IContent) {
  const db = database;
  remove(ref(db, userId+'/DailyContents/' + content.id));
}