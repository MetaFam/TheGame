export default (): null => null;

export const getStaticProps = async () => ({
  redirect: {
    destination: '/profile/setup/username',
    permanent: false,
  },
});
