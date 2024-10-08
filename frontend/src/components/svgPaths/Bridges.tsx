import React from "react";
import bridgeImage from "../../assets/testbridge.png";
import diagonalBridge2 from "../../assets/diagonal-bridge-2.png";
import horizontalBridge from "../../assets/horizontal-bridge.png";
import horizontalBridge2 from "../../assets/horizontal-bridge-2.png";
import verticalBridge from "../../assets/vertical-bridge.png";

export default function Bridges() {
  return (
    <>
      <defs>
        <pattern
          id="diagonal-bridge"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={bridgeImage}
          />
        </pattern>
        <pattern
          id="diagonal-bridge-2"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={diagonalBridge2}
          />
        </pattern>
        <pattern
          id="horizontal-bridge"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={horizontalBridge}
          />
        </pattern>
        <pattern
          id="horizontal-bridge-2"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={horizontalBridge2}
          />
        </pattern>
        <pattern
          id="vertical-bridge"
          x="0"
          y="0"
          width="1"
          height="1"
          viewBox="0 0 1024 576"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            width="1024"
            height="576"
            href={verticalBridge}
          />
        </pattern>
      </defs>
      <path
        className="bridge"
        id="tower-hills-bridge"
        fill="url(#diagonal-bridge)"
        d="m305.08 365.73 0.52966 10.064 3.4428 1.589 2.389 0.67928 16.414 14.151 16.155-5.2966c-3.1636-6.3559-3.9399-12.712-11.653-19.068-2.3251-2.3572-5.7718-2.5722-10.593-2.3835 1.6146-2.2811-4.963-3.449-4.2373 0.52966l-0.52966 2.3835c-2.8249-0.36875-5.6497 0.37319-8.4746-1.3242-0.29278-3.0058-2.2603-0.98745-3.4428-1.3242z"
      />
      <path
        className="bridge"
        id="the-shire-bridge"
        fill="url(#horizontal-bridge-2)"
        d="m 433.52754,589.51271 11.38772,8.7394 27.54237,-7.94491 0.26483,-6.88559 c 0.47756,-5.04084 -2.63553,-2.37906 -3.97246,-1.58899 l -3.70763,-0.26483 -0.79449,-4.76695 c -0.97192,-5.90755 -3.11086,-2.47892 -5.03178,-0.79449 -9.33865,-2.52263 -16.11954,0.0702 -21.98093,4.50212 -1.71282,-2.2805 -3.28639,-2.89012 -4.50212,0.79449 z"
      />
      <path
        className="bridge"
        id="esgaroth-bridge"
        fill="url(#horizontal-bridge)"
        d="m 1062.5,367.58474 31.5148,6.8856 10.8581,-8.20975 -0.7945,-10.85805 h -4.5021 c -7.099,-2.12526 -13.3265,-5.04281 -25.6886,-2.38348 -1.7526,-2.04084 -2.9658,-0.84547 -4.2373,0 l 0.2649,5.03178 -2.9132,1.05933 c -2.233,-3.43989 -5.5947,-1.92001 -5.2966,1.58898 z"
      />
      <path
        className="bridge"
        id="carrock-bridge"
        fill="url(#vertical-bridge)"
        d="m 937.81535,457.69824 10.86128,21.90982 c 5.05884,-1.92687 10.52168,-2.64175 15.91739,-3.55801 l 0.11911,-10.884 c -1.72641,-5.37642 -4.22583,-10.74856 -9.48228,-16.83099 l -1.31084,-2.99621 c -0.8739,-1.00775 -1.74779,-0.32834 -2.62169,0 l -0.74905,6.17969 -5.24338,0.37453 c -0.13505,-2.04969 -2.1147,-2.25478 -3.55801,-2.99622 l -1.12358,-3.37074 c -2.64579,0.0322 -1.62803,0.58782 -2.05989,0.93632 z"
      />
      <path
        className="bridge"
        id="north-mirkwood-bridge"
        fill="url(#vertical-bridge)"
        d="m 1031.25,463.45339 10.7256,20.78919 16.1547,-2.78072 -1.1917,-11.65254 c -1.3054,-6.30021 -4.3964,-11.08901 -9.9312,-16.68432 l -0.2648,-2.11865 c -0.3288,-0.81224 -1.1281,-0.99703 -2.5159,-0.39724 l 0.1324,7.41525 -5.8263,-0.52966 -4.6345,-5.69386 c -1.1476,-0.68094 -2.2952,-1.69476 -3.4428,0 z"
      />
      <path
        className="bridge"
        id="rivendell-bridge"
        fill="url(#vertical-bridge)"
        d="m 701.48888,555.07523 c 5.43843,7.25976 9.27546,13.69852 11.74275,20.68595 l 16.72129,-3.45771 v -12.73392 c -2.82334,-5.75475 -5.99978,-11.42123 -11.61033,-16.47918 v -1.87264 c -0.99874,-1.26907 -1.99748,-0.83035 -2.99622,-0.37452 v 7.49054 h -4.49432 c -2.17112,-1.65019 -4.49284,-2.99918 -5.99243,-5.99243 -1.06685,-1.17031 -2.11745,-0.39146 -3.17017,0.13242 z"
      />
      <path
        className="bridge"
        id="weathertop-bridge"
        fill="url(#diagonal-bridge)"
        d="m 684.07338,502.4542 22.47161,16.10466 14.60655,-5.05612 0.37453,-9.17591 -2.99622,-1.12358 c -4.44072,-5.06255 -7.27873,-11.38439 -18.35181,-11.2358 l -0.18727,-1.49811 c -0.88928,-0.13321 -2.38533,-0.4707 -3.74527,0 v 5.6179 c -2.37053,-1.44305 -4.99516,-1.61557 -7.86506,-0.56179 l -0.56179,-1.68537 c -1.13263,-0.87298 -2.14037,-2.62017 -3.74527,-0.18726 z"
      />
      <path
        className="bridge"
        id="minhiriath-bridge"
        fill="url(#diagonal-bridge)"
        d="m 485.01233,853.94769 24.34425,15.35561 13.67024,-5.43064 0.18726,-9.17591 c -0.99874,-1.91686 -1.99748,-0.79946 -2.99622,-0.93632 -3.80419,-4.95834 -6.76615,-10.42202 -17.79003,-11.04854 l -0.93631,-1.87264 c -0.83738,-0.82209 -2.46514,-0.0634 -3.74527,0 l -0.18727,5.99243 c -1.68998,-2.23795 -4.69923,-1.83734 -7.86506,-1.12358 l -0.18726,-2.0599 c -1.89312,-1.18503 -3.04889,-0.158 -4.49433,0 z"
      />
      <path
        className="bridge"
        id="another-bridge"
        fill="url(#diagonal-bridge)"
        d="m 530.19068,774.09957 23.30508,16.94916 15.09534,-4.76695 0.52966,-10.06356 -3.44279,-0.52966 C 562.46168,767.55515 555.5693,764.43458 546.875,763.77118 l -0.26483,-1.58898 h -3.97246 v 5.56144 c -2.20716,-0.37067 -2.96929,-1.31934 -7.41525,-0.79449 V 765.625 c -1.32757,-1.13734 -3.22804,-0.556 -5.03178,-0.26483 z"
      />
      <path
        className="bridge"
        id="eregion-bridge"
        fill="url(#diagonal-bridge-2)"
        d="m 630.51603,785.22201 17.79003,8.42685 c 9.86254,-9.7863 13.73265,-11.98486 20.03719,-18.16455 l -0.74905,-10.67402 c -2.13989,0.18726 -2.45473,0.37453 -3.18348,0.56179 l -0.18727,2.62169 c -1.41533,-0.44713 -2.61187,-1.00364 -6.92874,0 l -0.18727,-7.11601 -4.49432,0.18726 v 1.68537 c -9.31586,0.65641 -14.27593,6.55501 -21.90982,14.04476 z"
      />
      <path
        className="bridge"
        id="gladden-fields-bridge"
        fill="url(#horizontal-bridge)"
        d="m 899.36441,718.75 30.92091,5.45174 c 3.10689,-2.91369 6.73574,-6.2049 11.7168,-6.77589 l -1.12358,-11.16833 -2.58405,-1.01388 c -7.92916,-1.79615 -14.75241,-4.8562 -25.95339,-2.91313 -2.26454,-1.9384 -3.46671,-0.68968 -4.76695,0.26483 v 4.76695 l -3.97245,2.38347 c 1.24605,-2.24419 -4.02633,-5.56048 -3.97246,0.26483 z"
      />
      <path
        className="bridge"
        id="south-rhun-bridge"
        fill="url(#diagonal-bridge-2)"
        d="m 1233.8789,659.56823 18.3518,-15.91739 -0.7491,-11.98486 c -2.5806,0.20864 -5.4831,0.73911 -9.5504,2.43442 l 0.1873,-6.74148 c -1.3733,-0.74119 -2.7465,-1.33484 -4.1198,0.37453 l -0.1873,2.0599 c -6.8393,0.0661 -13.4796,1.07719 -18.3518,10.48675 -1.03,0.0936 -2.2426,-0.72629 -2.809,1.68537 v 10.29949 z"
      />
      <path
        className="bridge"
        id="enedwaith-bridge"
        fill="url(#diagonal-bridge)"
        d="m 596.80861,1123.7943 24.90604,17.2283 13.2957,-5.6179 -0.93631,-8.8014 c -5.81438,-4.7654 -6.09518,-12.4433 -20.41172,-12.7339 v -1.6854 c -0.91569,-0.4055 -1.68399,-1.032 -3.558,0 l 0.37452,6.1797 c -0.70203,-1.7928 -3.92358,-2.0109 -8.61412,-1.3109 l -0.56179,-1.4981 c -1.49811,-1.3732 -2.99621,-1.2484 -4.49432,0.3746 z"
      />
      <path
        className="bridge"
        id="gap-of-rohan-bridge"
        fill="url(#diagonal-bridge-2)"
        d="m 833.50961,1179.5988 20.22445,-16.2919 -0.37452,-10.2995 c -0.75469,-2.1054 -2.81476,-0.2947 -4.49433,0.3745 -2.53204,0.027 -4.12219,0.9964 -6.17969,1.4982 l -0.37453,-6.7415 c -1.16317,-1.4311 -2.45977,-1.7947 -4.11979,0.749 -8.7022,1.1802 -15.2035,5.0014 -18.91361,12.1721 l -1.68537,0.3746 v 11.2358 z"
      />
      <path
        className="bridge"
        id="emyn-muil-bridge"
        fill="url(#horizontal-bridge)"
        d="m 943.99505,1047.5781 5.24337,1.6854 c 6.90927,3.9585 16.55135,4.2732 26.40415,4.307 l 11.42307,-8.2396 0.18726,-9.1759 c -1.08661,-0.8417 -2.22373,-1.6477 -5.24337,-1.1236 -7.54267,-3.3678 -15.74573,-4.9195 -25.28057,-2.8089 -1.43569,-2.2992 -2.87137,-1.8702 -4.30706,-0.1873 l 0.74905,5.4307 -3.74526,1.1236 c -1.87264,-2.6896 -3.74527,-1.763 -5.61791,0 z"
      />
      <path
        className="bridge"
        id="minas-tirith-bridge"
        fill="url(#horizontal-bridge)"
        d="m 845.07415,1463.1886 3.97246,0.5296 c 3.6666,2.8539 6.82579,5.8582 23.60106,4.8281 l 4.68159,1.4981 10.29949,-7.116 0.93631,-9.7377 c -1.34008,-2.6296 -3.47507,-2.0795 -5.80516,-0.749 -6.26557,-3.8037 -13.90546,-5.546 -24.15699,-3.3708 -1.74779,-2.1122 -3.49558,-1.3466 -5.24337,0 l 0.74905,5.8052 h -3.37074 c -2.05131,-2.5444 -3.68578,-1.3372 -5.24338,0.5618 z"
      />
      <path
        className="bridge"
        id="harondor-bridge"
        fill="url(#diagonal-bridge)"
        d="m 913.84563,1783.5235 2.62169,1.3108 c 3.32458,6.4239 11.32891,11.288 20.59898,15.7301 l 14.79381,-3.9325 0.56179,-10.1122 c -1.4015,-1.2024 -2.65398,-1.6596 -3.558,-0.3746 -3.02062,-5.6847 -6.86,-11.051 -18.72635,-13.2957 -1.9136,-3.1601 -2.3525,-0.4213 -3.37074,0 l -0.56179,3.3708 -7.49054,0.5618 c -2.04932,-2.8904 -3.68823,-1.6767 -5.24338,0.3745 z"
      />
      <path
        className="bridge"
        id="umbar-bridge"
        fill="url(#vertical-bridge)"
        d="m 782.94848,1883.8967 c 5.28973,7.5529 7.99097,15.1059 10.86128,22.6588 l 15.16834,-2.9962 1.12358,-10.674 -1.68537,-0.3745 c 0.18785,-6.4918 -5.5737,-12.9836 -10.11223,-19.4754 l -2.43442,-0.1873 v 6.1797 l -5.61791,-0.3745 -3.93253,-4.4943 c -1.7493,-1.4448 -3.24439,-1.3642 -4.49432,0.1872 z"
      />
    </>
  );
}