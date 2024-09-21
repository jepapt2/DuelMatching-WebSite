import { app } from "src/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  TwitterAuthProvider,
  User,
  deleteUser,
} from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import Modal from "./Modal";

type UserProfile = {
  name: string;
  avatar?: string;
};

type UserData = {
  user: User;
  profile: UserProfile;
};

const AccountDeletePage = () => {
  const [user, setUser] = useState<UserData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteResult, setDeleteResult] = useState<string>();
  const auth = getAuth(app);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      getUserProfile(result.user);
    });
  };

  const handleTwitterLogin = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      getUserProfile(result.user);
    });
  };

  const getUserProfile = async (user: User) => {
    const db = getFirestore(app);
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userProfile = userDocSnap.data() as UserProfile;
      setUser({
        user,
        profile: userProfile,
      });
    } else {
      setUser({
        user,
        profile: {
          name: user.displayName ?? "",
          avatar: user.photoURL ?? "",
        },
      });
    }
    setDeleteResult("");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">アカウント削除</h1>
        {isModalOpen && (
          <Modal closeModal={() => setIsModalOpen(false)} footerText="">
            <div className="p-4">
              <p className="text-lg mb-4">このアカウントを削除しますか？</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  いいえ
                </button>
                <button
                  onClick={() => {
                    if (user) {
                      setIsLoading(true);
                      deleteUser(user.user)
                        .then(() => {
                          setDeleteResult("削除に成功しました");
                          setUser(undefined);
                        })
                        .catch((error) => {
                          setDeleteResult("削除に失敗しました");
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                    }
                    setIsModalOpen(false);
                  }}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  はい
                </button>
              </div>
            </div>
          </Modal>
        )}
        {deleteResult && <p>{deleteResult}</p>}
        {user && (
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="flex flex-row items-center justify-center">
              {user.profile.avatar && (
                <img
                  src={user.profile.avatar}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full mb-2 mr-2"
                />
              )}
              <p className="text-lg font-bold"> {user.profile.name}</p>
            </div>
            {isLoading && <p>削除中...</p>}

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white p-2 rounded"
            >
              アカウント削除
            </button>
          </div>
        )}

        <div className="flex flex-row gap-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Googleでログイン
          </button>
          <button
            onClick={handleTwitterLogin}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Twitterでログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletePage;
