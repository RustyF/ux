import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store';
import { selectMagicRecoveryCode } from '@store/onboarding/selectors';
import { doTrack, SIGN_IN_CORRECT } from '@common/track';
import { doStoreSeed } from '@store/wallet/actions';
import { DEFAULT_PASSWORD } from '@store/onboarding/types';

import { Box, Input, Text, Button } from '@blockstack/ui';
import { Screen, ScreenBody, ScreenActions, Title, PoweredBy, ScreenFooter } from '@blockstack/connect';
import { ScreenHeader } from '@components/connected-screen-header';
import { decrypt } from '@blockstack/keychain';
import useDocumentTitle from '@rehooks/document-title';

interface RecoveryProps {
  next: (identityIndex: number) => void;
}

export const DecryptRecoveryCode: React.FC<RecoveryProps> = ({ next }) => {
  const title = 'Enter your password';
  useDocumentTitle(title);
  const [passwordError, setPasswordError] = useState('');
  const [password, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const recoveryCode = useSelector((state: AppState) => selectMagicRecoveryCode(state) as string);
  return (
    <Screen isLoading={loading}>
      <ScreenHeader />
      <ScreenBody
        body={[
          <Title>{title}</Title>,
          'You entered a Magic Recovery Code. Enter the password you set when you first created your Blockstack ID.',
          <Box textAlign="left">
            {/*Validate: track SIGN_IN_INCORRECT*/}
            <Input
              autoFocus
              placeholder="Password"
              type="password"
              value={password}
              onChange={(evt: React.FormEvent<HTMLInputElement>) => {
                setPasswordError('');
                setCode(evt.currentTarget.value);
              }}
            />
            {passwordError && (
              <Text textAlign="left" textStyle="caption" color="feedback.error">
                {passwordError}
              </Text>
            )}
          </Box>,
        ]}
      />
      <ScreenActions>
        <Button
          width="100%"
          size="md"
          onClick={async () => {
            setLoading(true);
            try {
              const codeBuffer = Buffer.from(recoveryCode, 'base64');
              const seed = await decrypt(codeBuffer, password);
              await doStoreSeed(seed, DEFAULT_PASSWORD)(dispatch, () => ({}), {});
              doTrack(SIGN_IN_CORRECT);
              next(0);
            } catch (error) {
              setPasswordError('Invalid password.');
              setLoading(false);
            }
          }}
        >
          Continue
        </Button>
      </ScreenActions>
      <ScreenFooter>
        <PoweredBy />
      </ScreenFooter>
    </Screen>
  );
};