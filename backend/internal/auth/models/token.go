package models

type AccessTokenResponse struct {
	AccessToken string `json:"access_token"`
	Type        string `json:"type"`
}

func NewAccessTokenResponse(token AuthToken) AccessTokenResponse {
	return AccessTokenResponse{
		AccessToken: string(token),
		Type:        "Bearer",
	}
}
