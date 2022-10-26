import React, { Fragment, useEffect } from 'react';
import DOMPurify from 'dompurify';
import 'twin.macro';
import { cacheContext, EnsResp, TokenDeets } from '../../contexts/Cache';

interface AddressCellProps {
  value: string;
  formattedValue: string;
  rawValue: string;
}

export function AddressCell(props: AddressCellProps) {

  let { getTokenDeets, addressToEns } = React.useContext(cacheContext);
  let [tokenData, setTokenData] = React.useState<TokenDeets>();
  let [ens, setEns] = React.useState<EnsResp>();

  useEffect(()=>{
    getTokenDeets(props.rawValue).then(setTokenData);
    addressToEns(props.rawValue).then(setEns);
  },[props])

  if (Boolean(tokenData) || Boolean(ens)){
    return (
      <Fragment>
        {tokenData?.iconUrl && (
          <img style={{
            width: '24px',
            height: '24px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            marginRight: '5px',
          }} src={tokenData?.iconUrl} />
        )}
        <div
          tw="truncate"
          title={props.rawValue}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
                tokenData?.name ? `${tokenData?.name} ` : " " +
                ens ? `${ens} `: " "  +
                props.formattedValue
              ),
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
