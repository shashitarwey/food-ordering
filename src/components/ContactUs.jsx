const ContactUs = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl p-4 m-4">Contact Us Page</h1>
      <form action="">
        <input
          type="text"
          className="border border-black p-2 m-2 rounded-md"
          placeholder="name"
        />
        <input
          type="text"
          className="border border-black p-2 m-2 rounded-md"
          placeholder="message"
        />
        <button className="border border-black p-2 m-2 rounded-md bg-cyan-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
