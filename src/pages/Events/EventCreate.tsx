import { useState } from 'react';
import AxiosInstance from '../../utils/axios';
import type { IEvent } from '../../@types';
import { Link, useNavigate } from 'react-router-dom';

function EventCreate() {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const eventData = {
        title: event?.title,
        location: event?.location,
        date: event?.date,
        description: event?.description,
      };
      console.log(eventData);
      const response = await AxiosInstance.post('/me/events', eventData);

      // je veux rediriger l'utilisateur vers la page de l'événement
      // avec l'id de l'évenement qui vient d'être créé
      // récupérer l'ID de l'événement fraichement créé mais comment qu'on fait ça ?
      const createdEventId = response.data.id;
      navigate(`/event/${createdEventId}/edit`);

      // Réinitialise ou gère l'état après succès
      setEvent(null);
    } catch (err) {
      setError("Une erreur est survenue lors de la création de l'événement.");
    }
  };

  return (
    <main className="pt-24">
      <div className="relative">
        <div className="absolute bg-pink-50 h-full w-[400px] left-0 rounded-r-3xl" />
        <div className="relative max-w-[400px]">
          <h1 className="text-2xl font-bold py-4 text-center px-8 whitespace-nowrap sm: mb-6 md: mt-5">
            Créez votre évènement
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-pink-50 rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Le titre de votre évènement :
              </label>
              <input
                type="text"
                id="title"
                placeholder="Titre de l'évènement"
                className="w-full p-2 border rounded-md"
                onChange={(event) =>
                  setEvent(
                    (prev) =>
                      ({
                        ...prev,
                        title: event.target.value,
                      }) as IEvent,
                  )
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-gray-700 mb-2">
                  Localisation de l'évènement :
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Indiquez le lieu de l'évènement"
                  className="w-full p-2 border rounded-md"
                  onChange={(event) =>
                    setEvent(
                      (prev) =>
                        ({
                          ...prev,
                          location: event.target.value,
                        }) as IEvent,
                    )
                  }
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-gray-700 mb-2">
                  Date de l'évènement :
                </label>
                <input
                  type="date"
                  id="date"
                  placeholder="Indiquez la date de l'évènement"
                  className="w-full p-2 border rounded-md"
                  onChange={(event) =>
                    setEvent(
                      (prev) =>
                        ({
                          ...prev,
                          date: event.target.value,
                        }) as IEvent,
                    )
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Quelques mots sur l'évènement :
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Indiquez quelques mots sur l'évènement que vous organisez..."
                onChange={(event) =>
                  setEvent(
                    (prev) =>
                      ({
                        ...prev,
                        description: event.target.value,
                      }) as IEvent,
                  )
                }
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Créer l'évènement
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
      <div className="py-12">
        <div className="relative">
          <div className="absolute bg-pink-50 h-full md:right-[calc(50%-500px)] right-[calc(50%-200px)] left-0 rounded-r-3xl " />
          <div className="relative max-w-[950px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <p className="text-center text-sm flex-1 italic mr-4 py-4">
              Créez des événements et partagez-les avec la communauté,
              rencontrer de nouvelle connaissances prêtes à partager dees
              moments uniques.
            </p>
            <Link to="/events" className="m-3">
              <button
                type="button"
                className="px-8 py-3 bg-white border-2 border-rose-400 text-rose-400 rounded-lg shadow-md hover:bg-rose-400 hover:text-white transition-colors duration-300 sm: mb-6"
              >
                Retour à la liste des événements
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventCreate;
