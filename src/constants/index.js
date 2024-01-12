import { Alert } from 'antd';

export const regConfirmMessage = {
  Single: (
    <>
      <h3 className="text-base font-semibold">Thank you,</h3>
      <p className="text-slate-500">for taking part in the Tournament!</p>
      <hr className="my-2" />
      <p className="mb-3">
        To finalize your registration, kindly pay your entry fee. The entry fee for a Single
        participant is <br /> <span className="font-bold text-2xl">$30</span>.
      </p>
      <Alert
        message={
          <p>
            To finish your transaction, kindly use Zelle. Please Zelle to -<br />
            <span className="text-lg font-semibold">Md. Omar Faruk (214-414-6260).</span>
          </p>
        }
        type="info"
      />
    </>
  ),
  Double: (
    <>
      <h3 className="text-base font-semibold">Thank you,</h3>
      <p className="text-slate-500">for taking part in the Tournament!</p>
      <hr className="my-2" />
      <p className="mb-3">
        To finalize your registration, kindly pay your entry fee. The entry fee for a Double
        participant is <br /> <span className="font-bold text-2xl">$60</span>.
      </p>
      <Alert
        message={
          <p>
            To finish your transaction, kindly use Zelle. Please Zelle to -<br />
            <span className="text-lg font-semibold">Md. Omar Faruk (214-414-6260).</span>
          </p>
        }
        type="info"
      />
    </>
  )
};
