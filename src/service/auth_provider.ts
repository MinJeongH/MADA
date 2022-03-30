import { FirebaseError, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User} from "firebase/auth";
import { firebaseConfig } from "./firebase";

const auth = getAuth();
const app = initializeApp(firebaseConfig);


interface ICreateReturn{
  ret:Boolean;
  message:String;
  user?: User;
}

export const Join = async (email:string, password:string):Promise<ICreateReturn>=>{
  try{
    const userCredential= await createUserWithEmailAndPassword(auth, email, password)
    return {
      ret:true,
      message:`${userCredential.user}님 가입되셨습니다.`
    }
  } catch(error){
    return {
      ret:false,
      message:'문제가 발생하였습니다. 다시 시도해주세요'
    }
  }
}

export const LoginEmail = async (email:string, password:string):Promise<ICreateReturn> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return {
      ret: true,
      message: `반갑습니다 ${userCredential.user}`,
      user: userCredential.user,
    }
  } catch (error) {
    const er = error as FirebaseError;
    let text = '';
    if(er.code === 'auth/invalid-email') text = '회원정보가 없습니다.'
    else if(er.code === 'auth/wrong-password') text = '비밀번호가 다릅니다.'
    else if(er.code === 'auth/too-many-requests') text = '로그인 시도가 너무 많습니다. 조금 기다렸다가 다시 시도하세요.'
    return {
      ret: false,
      message: text
    }
  }
}

class GoogleAuth {
  LoginGoogle(providerName:string) {
    const provider = this.getProvider(providerName);
    return  (signInWithPopup(auth, provider)) 
  }

  LogoutGoogle() {
    signOut(auth);
  }

  getProvider(providerName:string) {
    if(providerName === 'Google') {
      return new GoogleAuthProvider();
    }
    else throw new Error(`${providerName}의 로그인을 지원하지 않습니다`);
  }
}

export const googleAuth = new GoogleAuth();