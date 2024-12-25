import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import { JwtPayload } from '../types/interfaces';
import { ApiError } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES } from '../common/constants';
import { config } from '../common/config';

export const supertokensInit = supertokens.init({
  framework: 'express',
  appInfo: {
    appName: 'music-api',
    apiDomain: 'http://localhost:5000',
    websiteDomain: 'http://localhost:5000'
  },
  supertokens: {
    connectionURI: config.SUPERTOKEN_URI,
    apiKey: config.SUPERTOKEN_API_KEY
  },
  recipeList: [
    Session.init({
      getTokenTransferMethod: () => 'header',
      antiCsrf: 'NONE'
    })
  ]
});

export const createSession = async (payload: {
  tenant_id: string;
  user_id: string;
  role: string;
}) => {
  const session = await Session.createNewSessionWithoutRequestResponse(
    'public',
    supertokens.convertToRecipeUserId(payload.user_id),
    payload
  );
  const result = session.getAllSessionTokensDangerously();
  return result;
};

export const validateSession = async (token: string) => {
  try {
    const verificationResponse = await Session.getSessionWithoutRequestResponse(token);
    const tokenPayload = verificationResponse.getAccessTokenPayload() as JwtPayload;
    return tokenPayload;
  } catch (err) {
    console.log(err);
    throw new ApiError(RESPONSES.UNAUTHORIZED_ACCESS, HTTP_STATUS_CODES.UNAUTHORIZED);
  }
};

export const revokeSession = async (token: string) => {
  try {
    await Session.revokeSession(token);
  } catch (err) {
    throw new ApiError(RESPONSES.UNAUTHORIZED_ACCESS, HTTP_STATUS_CODES.UNAUTHORIZED);
  }
};
