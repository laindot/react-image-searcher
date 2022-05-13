import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './header.css';
import './content.css';
import './article.css';

const App = () => {
  const [photos, setPhotos] = useState();
  const open = (url) => window.open(url);
  console.log(photos);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    'Client-ID i4WNjp46rJN5fqonsK0IhQV3pkhTyr0GyFjQ4wD-DKM',
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map((x) => (
            <article
              key={x.id}
              onClick={() => open(x.links.html)}
              className='article'
            >
              <img src={x.urls.regular} />
              <p>{[x.description, x.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
