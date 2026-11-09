import { JourneyPath, type PathProps } from "./JourneyPath";
import { JourneyStack, type StackProps } from "./JourneyStack";

type JourneyProps = ({ layout: "path" } & PathProps) | ({ layout: "stack" } & StackProps);

/**
 * Shared five-stage presentation. "path" is the curved route used by Home "Our Approach"; "stack"
 * is the sticky stack of cards used by the E-Plus Model. Both keep every stage in the markup and
 * read without motion.
 */
export function Journey(props: JourneyProps) {
  if (props.layout === "path") return <JourneyPath {...props} />;
  return <JourneyStack {...props} />;
}
