import { type FormEvent, useState } from 'react';
import AxiosInstance from '../utils/axios';
import { useUser } from '../context/UserContext';

interface FormLoginProps {
  onClose: () => void;
  userName: string | undefined;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const FormLogin: React.FC<FormLoginProps> = ({ onClose, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const { setUser, authErrorMsg, setAuthErrorMsg } = useUser();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formElm = event.currentTarget;

    // Récupérer les données du formulaire
    const formData = new FormData(formElm);
    const data = Object.fromEntries(formData);

    // Appel de l'API pour se connecter
    AxiosInstance.post('/login', data)
      .then((response) => {
        const { user, accessToken } = response.data;

        // Stocker le token dans localStorage pour que l'intercepteur l'ajoute automatiquement
        localStorage.setItem('token', accessToken);
        setUser(user);
        setUserName(user.userName); // Met à jour userName dans Nav
        formElm.reset(); // Réinitialise le formulaire
        setErrorMessage(undefined);
        setAuthErrorMsg(null);
        onClose(); // Ferme directement le formulaire
      })
      .catch(() => {
        setErrorMessage('Erreur lors de la connexion'); // Affiche le message d'erreur
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Entrez votre email"
            required
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Entrez votre mot de passe"
            required
          />
        </label>
        <button
          className="bg-blue-400 text-white p-2 rounded mt-4"
          type="submit"
        >
          Connexion
        </button>
      </form>
      {(errorMessage || authErrorMsg) && (
        <div className="text-red-500 text-sm">
          {errorMessage || authErrorMsg}
        </div>
      )}
    </div>
  );
};

export default FormLogin;
