class Auth {
  constructor() {
    this._url = "https://se-register-api.en.tripleten-services.com/v1";
    this._headers = { "Content-Type": "application/json" };
  }

  async signIn(email, password) {
    //fetch: 1o parametro é endpoint e o 2o é o objeto de configuração do fetch
    //método patrão do fetch é get
    const res = await fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async signUp(email, password) {
    //fetch: 1o parametro é endpoint e o 2o é o objeto de configuração do fetch
    //método patrão do fetch é get
    const res = await fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async getUser(jwt) {
    //retorna email e id
    //fetch: 1o parametro é endpoint e o 2o é o objeto de configuração do fetch
    //método padrão do fetch é get
    const res = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        //... para pegar apenas o conteúdo do objeto
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const auth = new Auth();
