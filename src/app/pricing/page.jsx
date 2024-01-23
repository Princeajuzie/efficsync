
export default function page() {
  return (
    <>
    <button type="button" class="inline-block px-6 py-3 mb-4 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">Button</button>
    <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-5/12">
  <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
    <div className="flex-auto p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-2/3 max-w-full px-3">
          <div>
            <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:opacity-60">
              Today's Money
            </p>
            <h5 className="mb-0 font-bold dark:text-white">
              $53,000
              <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                +55%
              </span>
            </h5>
          </div>
        </div>
        <div className="w-4/12 max-w-full px-3 text-right flex-0">
          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
            <i
              className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
    <div className="flex-auto p-4">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-2/3 max-w-full px-3">
          <div>
            <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:opacity-60">
              Today's Users
            </p>
            <h5 className="mb-0 font-bold dark:text-white">
              2,300
              <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                +3%
              </span>
            </h5>
          </div>
        </div>
        <div className="w-4/12 max-w-full px-3 text-right flex-0">
          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
            <i
              className="ni leading-none ni-world text-lg relative top-3.5 text-white"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




    </>
  )
}
