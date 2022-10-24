import { Fragment, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import 'twin.macro';

interface AddressCellProps {
  value: string;
  formattedValue: string;
  rawValue: string;
}

export function AddressCell(props: AddressCellProps) {

  let [tokenData, setTokenData] = useState<any>(false);

  useEffect(()=>{
    fetch(`https://rpc.omnid.space/tokendeets/${props.rawValue}`).then(r=>r.json()).then(setTokenData)
  },[props])

  if (Boolean(tokenData) && tokenData?.length > 0){
    return (
      <Fragment>
        {
          Boolean(tokenData) && tokenData?.length > 0 && (
            <img style={{
              width: '24px',
              height: '24px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              marginRight: '5px',
            }} src={tokenData[0]?.iconUrl} />
          )
        }
        <div
          tw="truncate"
          title={props.rawValue}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(tokenData[0]?.name + " " + props.formattedValue),
          }}
        />
      </Fragment>
    );
  }
  else {
    return (
      <Fragment>
        <div
          tw="truncate"
          title={props.rawValue}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(props.formattedValue),
          }}
        />
      </Fragment>
    );
  }
}
