export default function auth({ next, router }) {
    console.log(localStorage.getItem('access_token'));
    if (!localStorage.getItem('access_token')) {
      return router.push({ name: 'login' });
    }

    return next();
}