// Anatomical regions mapping for Korean martial arts vital point system
import type { BodyRegion } from "../../types";
import type { RegionData, VitalPoint } from "../../types/anatomy"; // VitalPoint is used for casting

// Import available VitalPoint objects
import {
  head_philtrum_injoong,
  head_temple_kanjanori,
  // vp_solar_plexus_myungchi, // This was unused according to error, re-add if needed by data
  // vp_knee_hollow_seulgul, // Import if needed by data
} from "./KoreanVitalPoints";

// TODO: Define and import ALL vital point objects used in this data structure.
// Casting to `any as VitalPoint` is a temporary workaround for missing definitions.

export const ANATOMICAL_REGIONS_DATA: Readonly<Record<BodyRegion, RegionData>> =
  {
    head: {
      name: { korean: "머리", english: "Head" },
      subRegions: ["face_upper", "temples", "occiput"],
      vitalPoints: [head_philtrum_injoong, head_temple_kanjanori],
      vulnerability: 1.5,
      pressure_points: ["baihui", "yintang", "taiyang"],
    },
    face_upper: {
      name: { korean: "얼굴 상부", english: "Upper Face" },
      subRegions: ["eyes", "nose"],
      vitalPoints: [
        "eye_socket" as any as VitalPoint,
        "bridge_of_nose" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.3,
      pressure_points: ["eye_socket"],
    },
    neck: {
      name: { korean: "목", english: "Neck" },
      // subRegions: [], // Property 'subRegions' is optional in RegionData or ensure it's always present
      vitalPoints: [
        "neck_carotid" as any as VitalPoint,
        "larynx" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.8,
      pressure_points: ["neck_carotid"],
    },
    torso: {
      name: { korean: "몸통", english: "Torso" },
      subRegions: ["chest", "abdomen", "back"],
      vitalPoints: [
        "solar_plexus" as any as VitalPoint,
        "ribs_floating" as any as VitalPoint,
        "kidney_area" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["solar_plexus", "zhongwan", "qihai"],
    },
    chest: {
      name: { korean: "가슴", english: "Chest" },
      // subRegions: [],
      vitalPoints: [
        "sternum_center" as any as VitalPoint,
        "clavicle_notch" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.1,
      pressure_points: ["sternum_center", "shanzhong", "qimen"],
    },
    abdomen: {
      name: { korean: "복부", english: "Abdomen" },
      // subRegions: [],
      vitalPoints: [
        "solar_plexus" as any as VitalPoint,
        "liver_area" as any as VitalPoint,
        "spleen_area" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.2,
      pressure_points: ["solar_plexus"],
    },
    back: {
      name: { korean: "등", english: "Back" },
      subRegions: ["upper_back", "lower_back"],
      vitalPoints: [
        "spine_cervical" as any as VitalPoint,
        "spine_thoracic" as any as VitalPoint,
        "kidney_area" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 0.9,
      pressure_points: ["kidney_area"],
    },
    upper_back: {
      name: { korean: "등 상부", english: "Upper Back" },
      // subRegions: [],
      vitalPoints: ["spine_thoracic" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 0.8,
      pressure_points: [],
    },
    lower_back: {
      name: { korean: "등 하부", english: "Lower Back" },
      // subRegions: [],
      vitalPoints: [
        "spine_lumbar" as any as VitalPoint,
        "kidney_area" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["kidney_area"],
    },
    limbs: {
      name: { korean: "팔다리", english: "Limbs" },
      subRegions: ["arms", "legs"],
      vitalPoints: [],
      vulnerability: 0.9,
      pressure_points: [],
    },
    arms: {
      name: { korean: "팔", english: "Arms" },
      subRegions: ["left_arm", "right_arm"],
      vitalPoints: [
        "bicep_radial_nerve" as any as VitalPoint,
        "elbow_joint_ulnar" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["elbow_joint_ulnar"],
    },
    left_arm: {
      name: { korean: "왼팔", english: "Left Arm" },
      // subRegions: [],
      vitalPoints: ["wrist_radial_artery_left" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["wrist_radial_artery_left"],
    },
    right_arm: {
      name: { korean: "오른팔", english: "Right Arm" },
      // subRegions: [],
      vitalPoints: ["wrist_radial_artery_right" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["wrist_radial_artery_right"],
    },
    legs: {
      name: { korean: "다리", english: "Legs" },
      subRegions: ["left_leg", "right_leg"],
      vitalPoints: [
        "femoral_artery_thigh" as any as VitalPoint,
        "knee_peroneal_nerve" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["femoral_artery_thigh"],
    },
    left_leg: {
      name: { korean: "왼다리", english: "Left Leg" },
      // subRegions: [],
      vitalPoints: ["ankle_achilles_left" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["ankle_achilles_left"],
    },
    right_leg: {
      name: { korean: "오른다리", english: "Right Leg" },
      // subRegions: [],
      vitalPoints: ["ankle_achilles_right" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.0,
      pressure_points: ["ankle_achilles_right"],
    },
    hands: {
      name: { korean: "손", english: "Hands" },
      // subRegions: [],
      vitalPoints: [
        "knuckles_base" as any as VitalPoint,
        "thumb_webbing" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.2,
      pressure_points: ["thumb_webbing"],
    },
    feet: {
      name: { korean: "발", english: "Feet" },
      // subRegions: [],
      vitalPoints: [
        "instep_top" as any as VitalPoint,
        "ball_of_foot" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.1,
      pressure_points: ["instep_top"],
    },
    joints: {
      name: { korean: "관절", english: "Joints" },
      // subRegions: [],
      vitalPoints: [
        "elbow_joint_ulnar" as any as VitalPoint, // TODO: Import/Define actual VitalPoint objects
        "knee_joint_patella" as any as VitalPoint, // TODO: Import/Define actual VitalPoint objects
        "shoulder_joint_capsule" as any as VitalPoint, // TODO: Import/Define actual VitalPoint objects
      ],
      vulnerability: 1.4,
      pressure_points: ["elbow_joint_ulnar", "knee_joint_patella"],
    },
    head_side: {
      name: { korean: "머리 측면", english: "Side of Head" },
      // subRegions: [],
      vitalPoints: [head_temple_kanjanori], // Assuming head_temple is head_temple_kanjanori
      vulnerability: 1.6,
      pressure_points: ["head_temple"],
    },
    upper_abdomen_center: {
      name: { korean: "상복부 중앙", english: "Upper Abdomen Center" },
      // subRegions: [],
      vitalPoints: ["solar_plexus" as any as VitalPoint], // TODO: Import/Define actual VitalPoint object for solar_plexus
      vulnerability: 1.7,
      pressure_points: ["solar_plexus"],
    },
    eyes: {
      name: { korean: "눈", english: "Eyes" },
      // subRegions: [],
      vitalPoints: ["eye_socket" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 2.0,
      pressure_points: ["eye_socket"],
    },
    nose: {
      name: { korean: "코", english: "Nose" },
      // subRegions: [],
      vitalPoints: [
        "bridge_of_nose" as any as VitalPoint,
        head_philtrum_injoong,
      ], // Used imported philtrum
      vulnerability: 1.5,
      pressure_points: ["philtrum"],
    },
    jaw: {
      name: { korean: "턱", english: "Jaw" },
      // subRegions: [],
      vitalPoints: [
        "jaw_point_mandible" as any as VitalPoint,
        "chin_menton" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.4,
      pressure_points: ["jaw_point_mandible"],
    },
    temples: {
      name: { korean: "관자놀이", english: "Temples" },
      // subRegions: [],
      vitalPoints: [head_temple_kanjanori], // Used imported temple
      vulnerability: 1.8,
      pressure_points: ["head_temple"],
    },
    philtrum: {
      // This region seems redundant if head_philtrum_injoong is used directly
      name: { korean: "인중", english: "Philtrum" },
      // subRegions: [],
      vitalPoints: [head_philtrum_injoong],
      vulnerability: 1.9,
      pressure_points: ["philtrum"],
    },
    mastoid_process: {
      name: { korean: "유돌", english: "Mastoid Process" },
      // subRegions: [],
      vitalPoints: ["mastoid_process" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.6,
      pressure_points: ["mastoid_process"],
    },
    occiput: {
      name: { korean: "후두골", english: "Occiput" },
      // subRegions: [],
      vitalPoints: ["occiput_base" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.7,
      pressure_points: ["occiput_base"],
    },
    ribs: {
      name: { korean: "갈비뼈", english: "Ribs" },
      // subRegions: [],
      vitalPoints: [
        "ribs_floating" as any as VitalPoint,
        "rib_cartilage_junction" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.2,
      pressure_points: ["ribs_floating"],
    },
    clavicle: {
      name: { korean: "쇄골", english: "Clavicle" },
      // subRegions: [],
      vitalPoints: [
        "clavicle_notch" as any as VitalPoint,
        "clavicle_midpoint" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.5,
      pressure_points: ["clavicle_notch"],
    },
    solar_plexus: {
      // This region seems redundant if a vp_solar_plexus_myungchi is used directly
      name: { korean: "명치", english: "Solar Plexus" },
      // subRegions: [],
      vitalPoints: ["solar_plexus" as any as VitalPoint], // TODO: Import/Define actual VitalPoint object for solar_plexus
      vulnerability: 1.8,
      pressure_points: ["solar_plexus"],
    },
    kidneys: {
      name: { korean: "신장", english: "Kidneys" },
      // subRegions: [],
      vitalPoints: ["kidney_area" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.7,
      pressure_points: ["kidney_area"],
    },
    liver: {
      name: { korean: "간", english: "Liver" },
      // subRegions: [],
      vitalPoints: ["liver_area" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.6,
      pressure_points: ["liver_area"],
    },
    spleen: {
      name: { korean: "비장", english: "Spleen" },
      // subRegions: [],
      vitalPoints: ["spleen_area" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.6,
      pressure_points: ["spleen_area"],
    },
    floating_ribs: {
      name: { korean: "뜬갈비뼈", english: "Floating Ribs" },
      // subRegions: [],
      vitalPoints: ["ribs_floating" as any as VitalPoint], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.4,
      pressure_points: ["ribs_floating"],
    },
    face: {
      name: { korean: "얼굴", english: "Face" },
      subRegions: ["face_upper", "eyes", "nose", "jaw", "philtrum"],
      vitalPoints: [
        "eye_socket" as any as VitalPoint, // TODO: Import/Define
        "bridge_of_nose" as any as VitalPoint, // TODO: Import/Define
        "jaw_point_mandible" as any as VitalPoint, // TODO: Import/Define
        head_philtrum_injoong,
      ],
      vulnerability: 1.5,
      pressure_points: ["philtrum", "eye_socket"],
    },
    leg_back_knee: {
      name: { korean: "무릎 뒤", english: "Back of Knee" },
      // subRegions: [],
      vitalPoints: [
        "popliteal_fossa" as any as VitalPoint,
        "knee_back_nerve" as any as VitalPoint,
      ], // TODO: Import/Define actual VitalPoint objects
      vulnerability: 1.6,
      pressure_points: ["popliteal_fossa"],
    },
    throat: {
      name: { korean: "목구멍", english: "Throat" },
      subRegions: [],
      vitalPoints: [],
      vulnerability: 1.0,
      pressure_points: [],
    },
    general: {
      name: { korean: "일반", english: "General" },
      subRegions: [],
      vitalPoints: [],
      vulnerability: 1.0,
      pressure_points: [],
    },
    internal: {
      name: { korean: "내부", english: "Internal" },
      subRegions: [],
      vitalPoints: [],
      vulnerability: 1.0,
      pressure_points: [],
    },
    pressure_points: {
      // This seems like a category rather than a body region
      name: { korean: "혈자리", english: "Pressure Points" },
      subRegions: [],
      vitalPoints: [
        head_philtrum_injoong,
        // vp_solar_plexus_myungchi, // Was commented out as unused, re-import if needed
        "vp_solar_plexus_myungchi" as any as VitalPoint, // TODO: Import/Define
        head_temple_kanjanori,
      ],
      vulnerability: 1.3,
      pressure_points: ["hegu", "taichong", "zusanli"],
    },
  } as const;

// Export the type for use elsewhere if needed
export type { RegionData } from "../../types/anatomy";
