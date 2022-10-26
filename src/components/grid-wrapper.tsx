import 'twin.macro';
import { StoreWrapper } from './store-wrapper';

import { Grid, GridProps } from './grid';
import { CacheProvider } from '../contexts/Cache';

function GridWrapper(props: GridProps) {
  return (
    <CacheProvider>
      <StoreWrapper>
        <div tw="flex flex-col h-full" className="github-octo-flat-ui">
          <Grid {...props} />
        </div>
      </StoreWrapper>
    </CacheProvider>
  );
}

export { GridWrapper };
