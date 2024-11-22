type Polyline = {
  encodedPolyline: string;
};

type RouteProps = {
  routes: [
    {
      distanceMeters: number;
      duration: string;
      polyline: Polyline;
    },
  ];
};

export class RouteDataBuilder {
  private readonly props: RouteProps = {
    routes: [
      {
        distanceMeters: 10000,
        duration: '536s',
        polyline: {
          encodedPolyline:
            'xwhV|fxiF?hBhDRe@dEs@`J_@zDUhDO?{ArBIDuI`LcCxCu@dAmDpEyD`FkArA]T{@m@mAo@YC]QgA[yCYy@E_CDqKd@yDL{BD_o@bC_BHIeDSiFG_BaOl@t@jPKH',
        },
      },
    ],
  };

  public static aRoute(): RouteDataBuilder {
    return new RouteDataBuilder();
  }

  public build(): RouteProps {
    return this.props;
  }
}
