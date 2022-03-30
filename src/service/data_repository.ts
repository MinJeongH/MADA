import { getDatabase, ref, set } from 'firebase/database';



function uploadContent (userId, content) {
  const db = getDatabase();
  set(ref(db, 'users/'+userId), {
    content: content
  });
}