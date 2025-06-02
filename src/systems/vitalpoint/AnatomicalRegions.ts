// Anatomical regions mapping for Korean martial arts vital point system
import type { BodyRegion, KoreanText } from "../../types";

// Define RegionData interface locally
interface RegionData {
  name: KoreanText;
  subRegions: readonly string[];
  vitalPoints: readonly string[];
  vulnerability: number;
}

export const ANATOMICAL_REGIONS_DATA: Readonly<Record<BodyRegion, RegionData>> =
  {
    head: {
      name: { korean: "머리", english: "Head" },
      subRegions: ["face_upper", "temples", "occiput"],
      vitalPoints: ["head_temple", "philtrum", "mastoid_process"],
      vulnerability: 1.5, // Added
    },
    face_upper: {
      name: { korean: "얼굴 상부", english: "Upper Face" },
      subRegions: ["eyes", "nose"],
      vitalPoints: ["eye_socket", "bridge_of_nose"],
      vulnerability: 1.3, // Added
    },
    neck: {
      name: { korean: "목", english: "Neck" },
      subRegions: ["throat"],
      vitalPoints: ["neck_carotid", "larynx"],
      vulnerability: 1.8, // Added
    },
    throat: {
      name: { korean: "목구멍", english: "Throat" },
      subRegions: [],
      vitalPoints: ["larynx"],
      vulnerability: 2.0, // Added
    },

    torso: {
      name: { korean: "몸통", english: "Torso" },
      subRegions: ["chest", "abdomen", "back"],
      vitalPoints: ["solar_plexus", "ribs_floating", "kidney_area"],
      vulnerability: 1.0, // Added
    },
    chest: {
      name: { korean: "가슴", english: "Chest" },
      subRegions: [],
      vitalPoints: ["sternum_center", "clavicle_notch"],
      vulnerability: 1.1, // Added
    },
    abdomen: {
      name: { korean: "복부", english: "Abdomen" },
      subRegions: [],
      vitalPoints: ["solar_plexus", "liver_area", "spleen_area"],
      vulnerability: 1.2, // Added
    },
    back: {
      name: { korean: "등", english: "Back" },
      subRegions: ["upper_back", "lower_back"],
      vitalPoints: ["spine_cervical", "spine_thoracic", "kidney_area"],
      vulnerability: 0.9, // Added
    },
    upper_back: {
      name: { korean: "등 상부", english: "Upper Back" },
      subRegions: [],
      vitalPoints: ["spine_thoracic"],
      vulnerability: 0.8, // Added
    },
    lower_back: {
      name: { korean: "등 하부", english: "Lower Back" },
      subRegions: [],
      vitalPoints: ["spine_lumbar", "kidney_area"],
      vulnerability: 1.0, // Added
    },

    limbs: {
      name: { korean: "팔다리", english: "Limbs" },
      subRegions: ["arms", "legs"],
      vitalPoints: [],
      vulnerability: 0.9, // Added
    },
    arms: {
      name: { korean: "팔", english: "Arms" },
      subRegions: ["left_arm", "right_arm"],
      vitalPoints: ["bicep_radial_nerve", "elbow_joint_ulnar"],
      vulnerability: 1.0, // Added
    },
    left_arm: {
      name: { korean: "왼팔", english: "Left Arm" },
      subRegions: ["hands"],
      vitalPoints: ["wrist_radial_artery_left"],
      vulnerability: 1.0, // Added
    },
    right_arm: {
      name: { korean: "오른팔", english: "Right Arm" },
      subRegions: ["hands"],
      vitalPoints: ["wrist_radial_artery_right"],
      vulnerability: 1.0, // Added
    },
    legs: {
      name: { korean: "다리", english: "Legs" },
      subRegions: ["left_leg", "right_leg"],
      vitalPoints: ["femoral_artery_thigh", "knee_peroneal_nerve"],
      vulnerability: 1.0, // Added
    },
    left_leg: {
      name: { korean: "왼다리", english: "Left Leg" },
      subRegions: ["feet"],
      vitalPoints: ["ankle_achilles_left"],
      vulnerability: 1.0, // Added
    },
    right_leg: {
      name: { korean: "오른다리", english: "Right Leg" },
      subRegions: ["feet"],
      vitalPoints: ["ankle_achilles_right"],
      vulnerability: 1.0, // Added
    },
    hands: {
      name: { korean: "손", english: "Hands" },
      subRegions: [],
      vitalPoints: ["knuckles_base", "thumb_webbing"],
      vulnerability: 1.2, // Added
    },
    feet: {
      name: { korean: "발", english: "Feet" },
      subRegions: [],
      vitalPoints: ["instep_top", "ball_of_foot"],
      vulnerability: 1.1, // Added
    },
    joints: {
      name: { korean: "관절", english: "Joints" },
      subRegions: [],
      vitalPoints: [
        "elbow_joint_ulnar",
        "knee_joint_patella",
        "shoulder_joint_capsule",
      ],
      vulnerability: 1.4, // Added
    },
    // Specific target areas that might overlap or be sub-regions
    head_side: {
      name: { korean: "머리 측면", english: "Side of Head" },
      subRegions: ["temples"],
      vitalPoints: ["head_temple"],
      vulnerability: 1.6, // Added
    },
    upper_abdomen_center: {
      name: { korean: "상복부 중앙", english: "Upper Abdomen Center" },
      subRegions: [],
      vitalPoints: ["solar_plexus"],
      vulnerability: 1.7, // Added
    },
    eyes: {
      name: { korean: "눈", english: "Eyes" },
      subRegions: [],
      vitalPoints: ["eye_socket"],
      vulnerability: 2.0, // Added
    },
    nose: {
      name: { korean: "코", english: "Nose" },
      subRegions: [],
      vitalPoints: ["bridge_of_nose", "philtrum"],
      vulnerability: 1.5, // Added
    },
    jaw: {
      name: { korean: "턱", english: "Jaw" },
      subRegions: [],
      vitalPoints: ["jaw_point_mandible", "chin_menton"],
      vulnerability: 1.4, // Added
    },
    temples: {
      name: { korean: "관자놀이", english: "Temples" },
      subRegions: [],
      vitalPoints: ["head_temple"],
      vulnerability: 1.8, // Added
    },
    philtrum: {
      name: { korean: "인중", english: "Philtrum" },
      subRegions: [],
      vitalPoints: ["philtrum"],
      vulnerability: 1.9, // Added
    },
    mastoid_process: {
      name: { korean: "유돌", english: "Mastoid Process" },
      subRegions: [],
      vitalPoints: ["mastoid_process"],
      vulnerability: 1.6, // Added
    },
    occiput: {
      name: { korean: "후두골", english: "Occiput" },
      subRegions: [],
      vitalPoints: ["occiput_base"],
      vulnerability: 1.7, // Added
    },
    ribs: {
      name: { korean: "갈비뼈", english: "Ribs" },
      subRegions: [],
      vitalPoints: ["ribs_floating", "rib_cartilage_junction"],
      vulnerability: 1.2, // Added
    },
    clavicle: {
      name: { korean: "쇄골", english: "Clavicle" },
      subRegions: [],
      vitalPoints: ["clavicle_notch", "clavicle_midpoint"],
      vulnerability: 1.5, // Added
    },
    solar_plexus: {
      name: { korean: "명치", english: "Solar Plexus" },
      subRegions: [],
      vitalPoints: ["solar_plexus"],
      vulnerability: 1.8, // Added
    },
    kidneys: {
      name: { korean: "신장", english: "Kidneys" },
      subRegions: [],
      vitalPoints: ["kidney_area"],
      vulnerability: 1.7, // Added
    },
    liver: {
      name: { korean: "간", english: "Liver" },
      subRegions: [],
      vitalPoints: ["liver_area"],
      vulnerability: 1.6, // Added
    },
    spleen: {
      name: { korean: "비장", english: "Spleen" },
      subRegions: [],
      vitalPoints: ["spleen_area"],
      vulnerability: 1.6, // Added
    },
    floating_ribs: {
      name: { korean: "뜬갈비뼈", english: "Floating Ribs" },
      subRegions: [],
      vitalPoints: ["ribs_floating"],
      vulnerability: 1.4, // Added
    },
    face: {
      name: { korean: "얼굴", english: "Face" },
      subRegions: ["face_upper", "eyes", "nose", "jaw", "philtrum"],
      vitalPoints: [
        "eye_socket",
        "bridge_of_nose",
        "jaw_point_mandible",
        "philtrum",
      ],
      vulnerability: 1.5, // Added
    },
    leg_back_knee: {
      name: { korean: "무릎 뒤", english: "Back of Knee" },
      subRegions: [],
      vitalPoints: ["popliteal_fossa", "knee_back_nerve"],
      vulnerability: 1.6, // Added - vulnerable area behind knee
    },
  } as const;

// This file should now be correct if `types/enums.ts` BodyRegion includes all used strings.
// No changes needed here if the enum is comprehensive.
// ...existing code...
