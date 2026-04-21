const ProfileCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-lg shadow-amber-300/7">
      <figure>
        <img
          src={photoUrl}
          alt="user-photo"
          className="w-full h-65 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{age + ", " + gender}</p>}
        {skills?.length > 0 && (
          <p>
            {skills.map((skill, index) => (
              <span key={skill}>
                {skill}
                {index !== skills.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}

        <div className="card-actions justify-center ">
          <div className="card-actions justify-around">
            <button className="btn btn-primary m-2">Ignore</button>
            <button className="btn btn-secondary m-2">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
