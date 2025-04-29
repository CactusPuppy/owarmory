export async function load({ parent }) {
  const { currentUser } = await parent();

  return {
    currentUser,
  };
}
