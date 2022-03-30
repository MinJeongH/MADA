import { database } from './firebase';
import { ref, set } from 'firebase/database';

interface IContentProps {
  id: number;
  title?: string;
  date: string;
  place_name: string;
  place_address: string;
  text: string;
}

export function uploadContent ( userId:string, content:IContentProps) {
  const db = database;
  set(ref(db, 'dailyContents/'+ userId + '/' + content.id), {
    content: content
  });
  console.log("!!");
}