
// Hacer graficos y cosas cuando este todo listo
export const Home = () => {
    return (
        <div className="relative z-10 bg-[#090E34] pb-[120px] pt-[120px] md:pt-[150px] lg:pb-[150px] lg:pt-[180px]">
            <div className="absolute right-0 top-0 z-[-1] h-full w-1/2 bg-primary"></div>
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[550px] text-center">
                            <span className="block mb-3 text-lg font-medium text-white">
                                Somos UGPS
                            </span>
                            <h1 className="mb-2 text-[60px] font-bold leading-[1.10] text-white md:text-[100px]">
                                UGPS
                            </h1>
                            <h2 className="mb-6 text-[30px] font-bold leading-[1.208] text-white md:text-[40px]">
                                Empresa de GPS
                            </h2>
                            <p className="mx-auto mb-9 max-w-[460px] text-base font-medium text-white">
                                Somos una empresa de GPS que se dedica a la venta de dispositivos de rastreo satelital, ademas de brindar servicios de instalación y monitoreo de los mismos.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}