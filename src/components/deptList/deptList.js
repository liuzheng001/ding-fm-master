
export default ({ list, onClick }) => (
  <div>
    {
      list.map(item => (
        <div className="t-LH44 t-FBH t-FBAC">
          <div className="t-FB1 t-PL10">
              {item.id}....{item.name}
          </div>
        </div>
      ))
    }
  </div>
);
