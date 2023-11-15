export const SizedBox = ({height, width}) =>
{
    return(<div style={{height: height ? height : 0, width: width ? width : 0}}></div>)
}