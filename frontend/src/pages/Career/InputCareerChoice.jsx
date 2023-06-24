'use client'
import "@/app/globals.css"
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '@/components/UserContext';

const InputCareerChoice = () => {
  const [errText, setErrText] = useState('');
  const [futurePlan, setFuturePlan] = useState('');
  const [decision, setDecision] = useState('willing');
  const [enableErr, setEnableErr] = useState(false);
  const [loadUs, setLoadUs] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [choice, setChoice] = useState(null);
  const currentDate = new Date();
  const router = useRouter();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  useEffect(() => {
    if (user) {
        setFuturePlan(user.futureplan)
        setDecision(user.careerchoice)
        setFinalized(user.fpfinalize)
      if (user.eligibleforresign) {
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getSelectedSemester/' + sessionStorage.getItem('selectedSemester')).then((res) => {
            console.log(res.data[0]);
            if (res.data[0].choiceenddate !== null && res.data[0].choicestartdate !== null) {
              const choicestart = new Date(res.data[0].choicestartdate);
              const choiceend = new Date(res.data[0].choiceenddate);

              setChoice({
                choicestart: choicestart,
                choiceend: choiceend,
              });

              if (choicestart > currentDate) {
                setTitle('Career Choice Update Phase has not yet started !');
                setMessage('Career Choice Update Phase will start on ' + choicestart.toLocaleDateString('en-GB', options));
              } else if (choiceend < currentDate) {
                setTitle('Career Choice Update Phase has Ended !');
                setMessage('Career Choice Update Phase ended on ' + choiceend.toLocaleDateString('en-GB', options));
              }

              console.log(choice);
            }

            setLoadUs(true);
          });
      } else {
        setTitle('Not Eligible');
        setMessage('You are not eligible for updating your career choice yet !');
      }
    }
  }, [loadUs, user]);

  const handleSubmit = () => {
    console.log(futurePlan);
    if (!futurePlan) {
      setErrText('Please insert your future plan');
      setEnableErr(true);
    } else {
      var data = {
        initial: sessionStorage.getItem('initial'),
        careerchoice: decision,
        futureplan: futurePlan,
      };

      console.log(data);
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/insertCareerChoice', data)
        .then((res) => {
          console.log(res);
          if (res.data === 'Success') {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleFinalize = () => {
    var data = {
      initial: sessionStorage.getItem('initial'),
    };

    console.log(data);
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/finalizeCareerChoice', data)
      .then((res) => {
        console.log(res);
        if (res.data === 'Success') {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!loadUs, !user) return <div></div>;
  else {
    if (message !== '') {
      return (
        <div className="hero min-h-screen bg-slate-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <div className="card w-100 bg-red-100 text-primary-content border border-red-500 shadow-xl shadow-slate-500">
                <div className="card-body  ">
                  <h2 className="card-title mb-5 font-bold text-red-500">{title}</h2>
                  <p className="text-black mb-5 text-lg">{message}</p>
                  <div className="card-actions justify-end mt-3">
                    <button className="btn bg-red-50 btn-error" onClick={() => router.push('/home')}>
                      Go back to home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pl-10 pr-10 pt-5 bg-base-200 min-h-screen w-full">
          <article className="prose base mb-5">
            <h2>
              <span>Career Choice for </span>
              <span>Even 2022/2023</span>
            </h2>
          </article>

          <div className="alert bg-red-200 shadow-lg mb-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6 text-red-800"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold text-red-800">Career choice update phase will end at {!choice ? '' : choice.choiceend.toLocaleDateString('en-GB', options)}</span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl flex-auto h-fit">
            <div className="card-body flex flex-col">
              <div className="flex">
                <h2 className="card-title mr-3">Decision :</h2>
                <select
                  className="select w-full max-w-xs bg-base-200"
                  value={decision}
                  onChange={(e) => {
                    setDecision(e.target.value);
                  }}
                  disabled={finalized}
                >
                  <option value="willing">Willing to Continue</option>
                  <option value="not willing">Not Willing to Continue</option>
                  <option value="tentative">Tentative</option>
                </select>
              </div>
              <h2 className="card-title">Future Plans</h2>
              <textarea
                className="textarea-md w-full h-56 resize-none bg-base-200"
                value={futurePlan}
                onChange={(e) => {
                  setFuturePlan(e.target.value);
                }}
                disabled={finalized}
              ></textarea>
              {enableErr && (
                <div className="flex p-4 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="pl-4 font-medium">{errText}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!finalized && (
            <div className="flex justify-end mt-5">
              <button className="btn btn-info bg-blue-500 hover:bg-blue-500 text-white w-32 mr-3" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-error text-white hover:bg-red-500 bg-red-500 w-32" onClick={handleFinalize}>
                Finalize
              </button>
            </div>
          )}
        </div>
      );
    }
  }
};

export default InputCareerChoice;
