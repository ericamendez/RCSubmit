const ResourcesView = () => {
  return (
    <div className="mainContainer">
      <section className="resourceTop">
        <section className="videoContainer">
          <iframe
            src="https://www.youtube.com/embed/WxV_lpjEGvI?si=FIiud4r6FxbLNG3W"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </section>
        <section className="reminders">
          <h1>Reminders:</h1>
          <ul>
            <li>Drink Water</li>
            <li>Stretch</li>
            <li>Take a Break</li>
            <li>Take a Walk</li>
            <li>Take a Deep Breath</li>
            <li>Give your eyes a break, look outside a window</li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default ResourcesView;
