import rocket from '../assets/loginSvg.svg';

function Post() {
  return (
    <div className=" flex items-center gap-3 shadow-xs  p-3">
      <div className="flex items-start gap-2">
        <img
          src={rocket}
          className="border-1 p-1 mb-20 rounded-full hover:border-emerald-400"
          width="40"
          alt=""
        />
        <div>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <h3 className="font-medium">MyName</h3>
              <p className="text-gray-400">10h</p>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              aperiam cumque quasi doloremque amet nisi eos saepe, quidem
              exercitationem, quibusdam voluptatem sint error nihil molestiae.
              Quisquam voluptas illo reiciendis neque!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
