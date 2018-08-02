
export default ({ record, onClick }) => (
  <div>
    {
      record.map(item => (
        <div className="t-LH44 t-FBH t-FBAC">
          <div className="t-FB1 t-PL10">
            {item.No}{item.name}{item.total}
          </div>
        </div>
      ))
    }
  </div>
);
